/**
 * Builds data/map.json: a static line drawing of the streets around the showroom,
 * made from OpenStreetMap data (© OpenStreetMap contributors, ODbL). The home page
 * shows it as a privacy-friendly preview; the interactive map loads only on click.
 *
 * Usage: npm run map            (queries the Overpass API once)
 *        npm run map -- <file>  (uses a saved Overpass JSON response)
 */
import fs from 'node:fs'
import path from 'node:path'

const CENTER = { lat: 47.3727136, lon: 9.6940083 } // OSM way 307149900, "Mega Cars"
const HALF_W = 800 // metres east/west of the showroom
const HALF_H = 500 // metres north/south
const VIEW_W = 1600
const VIEW_H = 1000

const QUERY = `[out:json][timeout:25];(
way(around:1000,${CENTER.lat},${CENTER.lon})[highway~"^(motorway|trunk|primary|secondary|tertiary|unclassified|residential|living_street|service|motorway_link|trunk_link|primary_link|secondary_link)$"];
way(around:1000,${CENTER.lat},${CENTER.lon})[railway=rail];
way(around:1000,${CENTER.lat},${CENTER.lon})[waterway~"^(river|canal|stream)$"];
);out geom;`

async function load() {
  const file = process.argv[2]
  if (file) return JSON.parse(fs.readFileSync(file, 'utf8'))
  const res = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'megacars-v2-build/1.0' },
    body: 'data=' + encodeURIComponent(QUERY),
  })
  if (!res.ok) throw new Error(`Overpass ${res.status}`)
  return res.json()
}

const mPerLon = 111320 * Math.cos((CENTER.lat * Math.PI) / 180)
const mPerLat = 110540
const project = ({ lat, lon }) => [
  ((lon - CENTER.lon) * mPerLon + HALF_W) * (VIEW_W / (2 * HALF_W)),
  (HALF_H - (lat - CENTER.lat) * mPerLat) * (VIEW_H / (2 * HALF_H)),
]

function kindOf(tags) {
  if (tags.railway) return 'rail'
  if (tags.waterway) return 'water'
  const h = tags.highway
  if (/^(motorway|trunk|primary|secondary)/.test(h)) return 'major'
  if (h === 'service') return 'minor'
  return 'street'
}

const data = await load()
const layers = { water: [], minor: [], street: [], major: [], rail: [] }
for (const el of data.elements) {
  if (!el.geometry) continue
  const pts = el.geometry.map(project)
  const inside = pts.some(([x, y]) => x > -50 && x < VIEW_W + 50 && y > -50 && y < VIEW_H + 50)
  if (!inside) continue
  const d = 'M' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L')
  layers[kindOf(el.tags)].push(d)
}
const [px, py] = project(CENTER)
const out = {
  viewBox: `0 0 ${VIEW_W} ${VIEW_H}`,
  pin: { x: +px.toFixed(1), y: +py.toFixed(1) },
  layers: Object.fromEntries(Object.entries(layers).map(([k, v]) => [k, v.join('')])),
  attribution: '© OpenStreetMap-Mitwirkende (ODbL)',
}
const target = path.join(process.cwd(), 'data', 'map.json')
fs.writeFileSync(target, JSON.stringify(out) + '\n')
console.log(`map.json: ${Object.entries(layers).map(([k, v]) => `${k} ${v.length}`).join(', ')}, ${fs.statSync(target).size} bytes`)

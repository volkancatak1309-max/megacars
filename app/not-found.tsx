// Requests that never reach a locale (e.g. a missing file) get this minimal page.
export default function GlobalNotFound() {
  return (
    <html lang="de">
      <body style={{ margin: 0, minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0d0e11', color: '#eff0f3', fontFamily: 'system-ui, sans-serif' }}>
        <p>
          Diese Seite gibt es nicht. <a href="/de" style={{ color: '#a4b5ef' }}>Zur Startseite von Mega Cars</a>
        </p>
      </body>
    </html>
  )
}

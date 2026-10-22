// The <html> element lives in app/[locale]/layout.tsx; this root only passes through
// (next-intl setup with a locale segment).
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}

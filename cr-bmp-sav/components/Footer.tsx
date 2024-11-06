const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer>
      <p>&copy; {year} BeeMyPhone</p>
    </footer>
  )
}

export default Footer
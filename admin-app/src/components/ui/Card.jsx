import { styles } from '../../theme'

export default function Card({ children, title, subtitle, style }) {
  return (
    <div style={{ ...styles.card, ...style }}>
      {title && <h1 style={styles.title}>{title}</h1>}
      {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
      {children}
    </div>
  )
}
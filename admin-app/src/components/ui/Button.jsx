import { styles } from '../../theme'

export default function Button({ children, loading, variant='primary', ...props }) {
  const base = variant === 'primary' ? styles.buttonPrimary : styles.buttonSecondary

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      style={{
        ...base,
        opacity: loading ? 0.6 : 1,
        cursor: loading ? 'not-allowed' : 'pointer',
        display:'flex', alignItems:'center', justifyContent:'center', gap:'8px',
        ...props.style
      }}
    >
      {loading ? 'Loading...' : children}
    </button>
  )
}

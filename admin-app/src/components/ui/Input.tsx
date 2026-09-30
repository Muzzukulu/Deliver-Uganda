import { useState } from 'react'
import { THEME } from '../../theme'

export default function Input({ label, error, as, children, style, ...props }){
  const [focused, setFocused] = useState(false)
  const isSelect = as === 'select'
  const styles = {
    input: { width:'100%', padding:'12px 14px', borderRadius: THEME.radius.md, border:`1.5px solid ${error ? THEME.colors.error : focused ? THEME.colors.primary : THEME.colors.border}`, outline:'none', fontSize:'14px', background: THEME.colors.bgCard, transition:'all 0.2s', boxSizing:'border-box' },
    label: { display:'block', fontSize:'13px', fontWeight:600, marginBottom:'6px', color: THEME.colors.textMain },
    error: { fontSize:'12px', color: THEME.colors.error, marginTop:'4px' }
  }
  return (
    <div style={{marginBottom:'4px'}}>
      {label && <label style={styles.label}>{label}</label>}
      {isSelect ? <select {...props} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} style={{...styles.input, cursor:'pointer', ...style}}>{children}</select> : <input {...props} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} style={{...styles.input, ...style}} />}
      {error && <div style={styles.error}>{error}</div>}
    </div>
  )
}

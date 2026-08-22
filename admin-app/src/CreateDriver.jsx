import { useState } from 'react'
import Input from './components/ui/Input'
import Card from './components/ui/Card'
import Button from './components/ui/Button'
import { THEME } from './theme'

export default function CreateDriver() {
  const [form, setForm] = useState({
    firstName:'', lastName:'', phone:'', nin:'', vehicle:'Boda Boda', plate:''
  })
  const [loading, setLoading] = useState(false)

  const handle = (e) => setForm({...form, [e.target.name]: e.target.value})

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // TODO: connect to backend: /api/drivers
    setTimeout(()=>{ alert('Driver Created!'); setLoading(false) }, 1000)
  }

  return (
    <div style={{minHeight:'100vh', background:THEME.colors.bgPage, display:'flex', alignItems:'center', justifyContent:'center', padding:'24px'}}>
      <Card style={{maxWidth:'520px', width:'100%'}} title="Create Driver" subtitle="Register a new delivery partner">
        
        <form onSubmit={submit} style={{display:'flex', flexDirection:'column', gap:'16px', marginTop:'24px'}}>
          
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px'}}>
            <Input label="First Name" name="firstName" required value={form.firstName} onChange={handle} placeholder="Muzzukulu" />
            <Input label="Last Name" name="lastName" required value={form.lastName} onChange={handle} placeholder="Deliver" />
          </div>

          <Input label="Phone Number" name="phone" required value={form.phone} onChange={handle} placeholder="+256 700 000000" />
          
          <Input label="National ID (NIN)" name="nin" required value={form.nin} onChange={handle} placeholder="CFXXXXXXXXXXXX" />

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px'}}>
            <Input label="Vehicle Type" name="vehicle" as="select" required value={form.vehicle} onChange={handle} style={{cursor:'pointer'}}>
              <option>Boda Boda</option>
              <option>Box Boda</option>
              <option>Van</option>
            </Input>
            <Input label="Number Plate" name="plate" required value={form.plate} onChange={handle} placeholder="UAM 123A" />
          </div>

          <Button type="submit" loading={loading} style={{marginTop:'8px'}}>
            Create Account →
          </Button>
        </form>

        <p style={{textAlign:'center', color:THEME.colors.textMuted, fontSize:'13px', marginTop:'16px'}}>
          Driver will receive SMS to set password
        </p>
      </Card>
    </div>
  )
}
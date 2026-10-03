import { describe, expect, it } from 'vitest'
import { APP, STATUS_LABELS } from '../config'
describe('configuración base',()=>{it('incluye identidad y estados',()=>{expect(APP.name).toContain('Tu Voz');expect(STATUS_LABELS.received).toBe('Recibido')})})

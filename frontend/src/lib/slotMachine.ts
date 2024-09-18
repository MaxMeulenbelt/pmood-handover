import { createContext } from 'react'
import SlotsContextActions from '../models/SlotMachine/SlotsContextActions'

export const SlotsContext = createContext<SlotsContextActions | null>(null)

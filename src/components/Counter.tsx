import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { increment, decrement, incrementByAmount, decrementByAmount } from '../features/counter/counterSlice'

export function Counter() {
  const [amountToIncrement, setAmountToIncrement] = useState('0')
  const [amountToDecrement, setAmountToDecrement] = useState('0')

  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <>
      <div>
        <button onClick={() => dispatch(decrement())}>
          Decrement
        </button>
        <span>{count}</span>
        <button onClick={() => dispatch(increment())}>
          Increment
        </button>
      </div>

      <div>
        Increment by amount
        <input 
          type="number"
          value={amountToIncrement}
          onChange={(e) => setAmountToIncrement(e.target.value)}
        />
        <button onClick={() => {
          dispatch(incrementByAmount(Number(amountToIncrement)))
          setAmountToIncrement('0')
        }}>
          Increment
        </button>
      </div>

      <div>
        Decrement by amount
        <input 
          type="number"
          value={amountToDecrement}
          onChange={(e) => setAmountToDecrement(e.target.value)}
        />
        <button onClick={() => {
          dispatch(decrementByAmount(Number(amountToDecrement)))
          setAmountToDecrement('0')
        }}>
          Decrement
        </button>
      </div>
    </>
  )
}
import './css/main.css'
import { useRef, useState } from "react"
import { nanoid } from "nanoid"

function App() {

  const serviceField = useRef(null)
  const priceField = useRef(null)

  const [list, setList] = useState([])

  const priceList = list.map(item => {
    return(
      <li className='main__list-item' key={nanoid()}>
        {item.service} {item.price}
        <div className='main__list-btns'>
            <button onClick={() => edit(item.id)}>✎</button>
            <button onClick={() => del(item.id)}>✖</button>            
        </div>
      </li>
    )
  })

  function edit(id){
    const editService = list.find(item => item.id === id)
    serviceField.current.value = editService.service
    priceField.current.value = editService.price
    setList(prevList => prevList.filter(item => item.id !== id))
  }

  function del(id){
    setList(prevList => prevList.filter(item => item.id !== id))
  }

  function save(){
    const service = serviceField.current.value
    const price = priceField.current.value
    if (!service || !price) return null
    setList(prevList => [...prevList, {id: list.length, service: service, price: price}])
    cancel()
  }

  function cancel() {
    serviceField.current.value = ""
    priceField.current.value = ""
    serviceField.current.focus()
  }

  return (
    <div className="main">
        <div className='main__box'>
            <input className="main__input" type="text" placeholder='service' ref={serviceField}></input>
            <input className="main__input" type="number" placeholder='price' ref={priceField}></input>
            <div className="main__btn">
                <button className="main__btn-save" onClick={save}>Save</button>
                <button className="main__btn-cancel" onClick={cancel}>Cancel</button>
            </div>
        </div>
        <ul className='main__list'>
            {priceList}
        </ul>
    </div>
  )
}
export default App;

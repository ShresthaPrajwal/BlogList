import { useState , forwardRef, useImperativeHandle} from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props,ref) => {
    const [visible, setVisible] = useState(false)
  
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
  
    const toggleVisibility = () => {
      setVisible(!visible)
    }
    useImperativeHandle(ref,()=>{
        return {toggleVisibility}
    })
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility} class="text-gray-900 w-40 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-2 py-0.5 m-2">{props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {props.children}
          <button onClick={toggleVisibility} class="text-red-400 w-40 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-2 py-0.5 m-2">Cancel</button>
        </div>
      </div>
    )
  })
Togglable.propTypes ={
  buttonLabel: PropTypes.string.isRequired
}
export default Togglable
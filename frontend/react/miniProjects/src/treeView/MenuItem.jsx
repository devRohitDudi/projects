import { useState } from 'react'
import MenuList from './MenuList'
import PropTypes from 'prop-types'
import { FaPlus, FaMinus } from 'react-icons/fa'

function MenuItem({ item }) {

    const [showCurrentChild, setShowCurrentChild] = useState({})

    const handleDisplay = (currentChild) => {
        setShowCurrentChild({
            ...showCurrentChild,
            [currentChild]: !showCurrentChild[currentChild]
        })
        console.log(showCurrentChild);

    }

    return (
        <li className='liElement'>
            <div className='menu-item flex' >
                <p  >{item.label}</p>
                {
                    (item && item.children && item.children.length > 0) ?
                        <span onClick={() => handleDisplay(item.label)}>{
                            showCurrentChild[item.label] ? <FaMinus /> : <FaPlus />
                        }</span> : null
                }
            </div>
            {
                (item && item.children && item.children.length > 0 &&
                    showCurrentChild[item.label]) ? <MenuList list={item.children} /> : null
            }
        </li>
    )
}

MenuItem.propTypes = {
    item: PropTypes.shape({
        label: PropTypes.string.isRequired,
        children: PropTypes.arrayOf(PropTypes.object)
    }).isRequired
}

export default MenuItem
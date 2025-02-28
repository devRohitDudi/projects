import MenuList from './MenuList'
import menus from './data'
import './style.css'

function Treepage() {
    return (
        <div className='w-full bg-slate-600  flex'>
            <div className='tree-view-container'>
                <MenuList list={menus} />
            </div>
        </div>

    )
}

export default Treepage
import MenuItem from './MenuItem'
import PropTypes from 'prop-types';

function MenuList({ list }) {
    return (
        <ul className='p-4  menu-list-container w-full' >
            {
                list && list.length ?
                    list.map((listItem) => <MenuItem key={listItem.label} item={listItem} />) : null
            }
        </ul>

    )
}

MenuList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default MenuList

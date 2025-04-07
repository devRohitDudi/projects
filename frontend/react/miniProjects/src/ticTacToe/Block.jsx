import PropTypes from 'prop-types'

function Block({ onClick, value }) {
    return (
        <button className='text-3xl text-black bg-gray-200 w-20 h-20 border hover:cursor-crosshair' onClick={onClick}>{value}</button>
    )
}

Block.propTypes = {
    onClick: PropTypes.func.isRequired,
    value: PropTypes.string
}
export default Block
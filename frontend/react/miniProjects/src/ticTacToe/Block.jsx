import PropTypes from 'prop-types'

function Block({ onclick, value }) {
    return (
        <div className='text-3xl w-20 h-20 border hover:cursor-crosshair' onClick={onclick}>{value}</div>
    )
}

Block.propTypes = {
    onclick: PropTypes.func.isRequired,
    value: PropTypes.string
}
export default Block
import PropTypes from 'prop-types';

function Block({ isActive, title, value, onClick }) {
    return (
        <div onClick={onClick} className={`w-[500px]  mt-4 pt-2 pb-2 pl-3 pr-3 flex flex-col justify-between items-center hover:cursor-pointer ${isActive ? "bg-green-700" : "bg-yellow-700"}`}>
            <div className="flex flex-row justify-between items-center w-full p-1 text-white font-bold text-[25px] ">
                <h1 className='p-2 text-start '>{title}</h1>
                <button className='text-2xl'>{isActive ? "-" : "+"}</button>
            </div>
            <p className='p-2 text-white font-bold text-[18px]'>{isActive ? value : null}</p>
        </div>
    )
}

Block.propTypes = {
    isActive: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.string,
    oncClick: PropTypes.func,
};

export default Block
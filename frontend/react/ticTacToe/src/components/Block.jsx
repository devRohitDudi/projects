import React from 'react'
// import PropTypes from "prop-types";

function Block({ onClick, value }) {
    return (
        <div className="h-[80px] w-[80px] border border-solid border-black
         flex justify-center items-center text-[40px] font-bold hover:bg-gray-350
         bg-gray-200 hover:cursor-crosshair"
            onClick={onClick}
        >
            {value}</div>
    )
}
// Prop Types Validation
// Block.propTypes = {
//     onClick: PropTypes.func.isRequired,
//     value: PropTypes.string, // Adjust type based on what you expect
// };

export default Block
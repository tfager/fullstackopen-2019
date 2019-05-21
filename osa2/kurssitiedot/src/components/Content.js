import React from 'react';
import Part from './Part.js';
import Total from './Total.js';

const Content = ({course}) => {
    const parts = () => course.parts.map(part =>
        <Part key={part.name} part={part} />
    )
    const total = course.parts.reduce( (sum, part) => sum+part.exercises, 0)
    return (
        <div>
            {parts()}
            <Total total={total} />
        </div>
    )
}

export default Content
import React from 'react';
import Header from './Header.js'
import Content from './Content.js'

const Course = ({course}) => {
  return (
      <div>
        <Header header={course.name} />
        <Content course={course} />
      </div>
  )
}

export default Course
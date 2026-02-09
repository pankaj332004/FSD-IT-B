import React,{useState} from 'react'
import './Student.css'

const Student = () => {
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(200);
  return (

    <div className='card'>
      <img src="https://static.vecteezy.com/system/resources/previews/024/724/633/non_2x/a-happy-smiling-young-college-student-with-a-book-in-hand-isolated-on-a-transparent-background-generative-ai-free-png.png" alt="class img" />
      <h3>Name : Ritesh Singh</h3>
      <h3>Class : B.Tech</h3>
    <div>
        <button onClick={() => setWidth(width + 20)}>col+</button>
        <button onClick={() => setWidth(width > 50 ? width - 20 : 50)}>col-</button>
        <button onClick={() => setHeight(height + 20)}>row+</button>
        <button onClick={() => setHeight(height > 50 ? height - 20 : 50)}>row-</button>
    </div>
    <button onClick={() => alert('Student added successfully!')}>Add Student</button>
    </div>
  )
}

export default Student

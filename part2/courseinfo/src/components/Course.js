import React from 'react'

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

const Header = ({ course }) => {
    return (
        <div>
            <h1>{course.name}</h1>
        </div>
    )
}

const Content = ({ course: { parts } }) => {
    const rows = () => parts.map(part =>
        <Part
            key={part.id}
            part={part.name}
            exercises={part.exercises}
        />
    )
    return (
        <div>
            {rows()}
        </div>
    )
}

const Part = ({ part, exercises }) => {
    return (
        <div>
            <p>
                {part} {exercises}
            </p>
        </div>
    )
}

const Total = ({ course: { parts } }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <div>
            <p><b>total of {total} exercises</b></p>
        </div>
    )
}

export default Course
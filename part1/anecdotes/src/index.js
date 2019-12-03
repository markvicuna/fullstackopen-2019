import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

const App = ({ anecdotes}) => {
    const [selected, setSelected] = useState({
        anecdote: 0, votes: Array(anecdotes.length).fill(0)
    })

    const handleNextClick = () => {
        const previousNumber = selected.anecdote
        let randomNumber = Math.floor(Math.random() * anecdotes.length)
        while (previousNumber === randomNumber) {
            randomNumber = Math.floor(Math.random() * anecdotes.length)
        }

        const newAnecdote = {
            ...selected,
            anecdote: randomNumber
        }

        return () => {
            setSelected(newAnecdote)
        }
    }

    const handleVoteClick = () => {
        const votesCopy = [...selected.votes]
        votesCopy[selected.anecdote] += 1

        const newVote = {
            ...selected,
            votes: votesCopy
        }

        return () => {
            setSelected(newVote)
        }
    }
    
    const indexOfMaxVotes = selected.votes.indexOf(Math.max(...selected.votes))

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <div>{anecdotes[selected.anecdote]}</div>
            <div>has {selected.votes[selected.anecdote]} votes</div>
            <Button handleClick={handleVoteClick()} text='vote' />
            <Button handleClick={handleNextClick()} text='next anecdote' />
            <h1>Anecdote with most votes</h1>
            <div>{anecdotes[indexOfMaxVotes]}</div>
            <div>has {selected.votes[indexOfMaxVotes]} votes</div>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
import React from 'react'
import './about.css'

export function About() {
    return (
        <main className='main'>
            <h1> How to play: </h1>
            <h2> Reading your stats: </h2>
            <p>You business consists of eight stats. Your balance represents how much money you 
                currently have to your businesses name. Your income per day is the average gross 
                amount of money going to your business, your costs per day is the average gross 
                amount of money going out of your business, and the net per day is the total of the 
                two values. Your employee stat represents how many people are on your payroll. The 
                wages of your employees is keep in the average wage stat, and go directly into your 
                costs, however, having more employees can increase how much your customers are paying. 
                Next is customers per day. This represents how many people, on average, are 
                paying your business. The final stat is how much, on average, each of those costumers are 
                paying.</p>
            <h2> Events and the Passing of time: </h2>
            <p>Your stats are defined by day, but the completion of an event causes the next week to 
                complete. Every hour you receive a new event, with a maximum of three pending events 
                at any given time. You can read and make a decision for them any time you like. Time 
                will not continue for your business until you do.</p>
            <h2> Decisions: </h2>
            <p>Every event will have 2-4 decisions to choose from. You won't know ahead of time the exact 
                effects of your decisions, but the results will show up in your event history on your 
                business page. These results will immediately affect the next week of your business.</p>
        </main>
    )
}
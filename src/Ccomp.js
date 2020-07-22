import React, { Component } from 'react'

export default class Ccomp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            input: '',
            items: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.doItem = this.doItem.bind(this)
        this.undoItem = this.undoItem.bind(this)
    }

    handleChange(event) {
        this.setState({
            input: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        const input = this.state.input
        if (!input) return 
        event.target.firstChild.value = ''
        var items = this.state.items
        
        items.push({
            text: this.state.input,
            state: false
        })

        this.setState({
            items: items, 
            input: ''
        })
    }

    deleteItem(event) {
        console.log(event.target.dataset.index)
        var items = this.state.items
        items.splice(Number(event.target.dataset.index), 1)
        this.setState({
            items: items
        })
    }

    doItem(event) {
        console.log(event.target.dataset.index)
        var items = this.state.items
        items[event.target.dataset.index].state = true
        this.setState({
            items: items
        })
    }
    
    undoItem(event) {
        console.log(event.target.dataset.index)
        var items = this.state.items
        items[event.target.dataset.index].state = false
        this.setState({
            items: items
        })
    }

    render() {
        const { items } = this.state
        return (
            <div className='todo'>
                <form className='header' onSubmit={ this.handleSubmit }>
                    <input type='text' placeholder='Enter text...' onChange={ this.handleChange }/>
                    <button type='submit'>Submit</button>
                </form>
                <div className='items'>
                    { items.map(
                        (item, index) => {
                            return (
                                item.state ? 
                                    <div className='item' key={ index }>
                                        <p style={{textDecoration: 'line-through'}}>{ item.text }</p>
                                        <button onClick={ this.undoItem } data-index={ index }>undo</button> 
                                        <button onClick={ this.deleteItem } data-index={ index }>delete</button> 
                                    </div>
                                : 
                                    <div className='item' key={ index }>
                                        <p>{ item.text }</p>
                                        <button onClick={ this.doItem } data-index={ index }>do</button> 
                                        <button onClick={ this.deleteItem } data-index={ index }>delete</button> 
                                    </div>
                            )
                        }
                    ) }
                </div>
            </div> 
        )
    }
}
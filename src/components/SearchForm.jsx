import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


export default function SearchForm () {
    const [searchStr, setSearchStr] = useState('');

    const [targets, setTargets] = useState({
        'Stack Overflow': '',
        'GitHub': '',
        'Wikipedia': '',
        'Walmart': '',
        'Amazon': '',
        'Reddit': ''
    })



    const mapping = [
        {
            'label': 'Stack Overflow',
            'target': 'site:stackoverflow.com'
        },
        {
            'label': 'GitHub',
            'target': 'site:github.com'
        },
        {
            'label': 'Wikipedia',
            'target': 'site:wikipedia.com'
        },
        {
            'label': 'Walmart',
            'target': 'site:walmart.com'
        },
        {
            'label': 'Amazon',
            'target': 'site:amazon.com'
        },
        {
            'label': 'Reddit',
            'target': 'site:reddit.com'
        },
    ]

    function onCheck(event) {
        let checked = event.target.checked;
        let name = event.target.name;

        let value = ''
        
        if (checked) {
            value = event.target.value;
        }
        
        setTargets({...targets, [name]: value})
    }

    var checkboxes = []

    mapping.forEach((object) => {
        checkboxes.push(
            <span className='target'>
                <input type="checkbox" name={ object.label } value={ object.target } onClick={ onCheck } />
                <label onClick={ onCheck }>{ object.label }</label>
            </span>
        )
    });

    function onChangeHandler(event) {
        setSearchStr(event.target.value);
    }

    function onSubmitHandler(event) {
        var request = {
            'search_str': searchStr,
            'targets': []
        }

        Object.keys(targets).forEach((object) => {
            if (targets[object] !== "") {
                request.targets.push(targets[object])
            }
        })

        console.log(request)
        axios.post('https://3vjnu1bd05.execute-api.us-east-1.amazonaws.com/bifrost/search', request).then(response => {
            window.open(response.data, '_self');
        })
        .catch(error => {console.log(error)});
    }

    function onEnter(event) {
        if (event.key === 'Enter') {
            onSubmitHandler(event)
        }        
    }

    return (
        <div className='form'>
            <div className="search">
                <input type="text" className="searchTerm" placeholder="What are you looking for?" value={ searchStr } onChange={onChangeHandler} onKeyDown={ onEnter } />
                <button type="submit" className="searchButton" onClick= {onSubmitHandler}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
            <div className='checklist'>
                { checkboxes }
            </div>
        </div>
    );
};

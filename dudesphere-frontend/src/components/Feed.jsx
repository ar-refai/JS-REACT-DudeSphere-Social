import React , {useState ,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { client } from '../client';
import Spinner from './Spinner';
import MasonryLayout from './MasonryLayout';
import {feedQuery , searchQuery} from '../utils/data';
const Feed = () => {
    const [loading, setLoading] = useState(false);
    const [pins, setPins] = useState(null);
    const { categoryId } = useParams();
    
    useEffect(() => {
        setLoading(true);
        let query = '';
        if(categoryId) {
            query = searchQuery(categoryId);
            client.fetch(query)
            .then((data) => {
                setPins(data);
                console.log(pins);
                setLoading(false);
            })
        } else {
            client.fetch(feedQuery)
            .then((data) => {
                setPins(data);
                console.log(pins);
                setLoading(false);
            })
        }
    }, [categoryId]);
    
    if (loading)  return <Spinner message="We are adding new ideas to our feed!"/>
return (
    <div>
        {pins && <MasonryLayout pins={pins} />}
    </div>
)
}

export default Feed;

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useFetching = (someFetchActionCreator: any, func: any) => {
    const dispatch = useDispatch()

    useEffect(() => {
        if(func) dispatch(someFetchActionCreator);
        console.log('fetching');
    }, [dispatch])
}
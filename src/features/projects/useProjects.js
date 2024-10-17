import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getProjects } from '../../services/apiProjects';

export function useProjects(userId) {
    const [searchParams] = useSearchParams();
    const sortBy = searchParams.get('sortBy') || 'created_at-desc';
    const filterValue = searchParams.get('filter') || 'all';
const searchValue = searchParams.get('search') || '';
const selectedQuery = searchParams.get('query') || '';
    const [sortField, order] = sortBy.split('-');
    const filterField = 'category'; // Adjust this as needed

    const queryKey = ['userProjects', userId, sortField, order, filterField, filterValue, searchValue, selectedQuery];

    const { data: userProjects, isLoading } = useQuery({
        queryKey:queryKey,
        queryFn: () => getProjects(userId, sortField, order, filterField, filterValue, searchValue, selectedQuery),
        keepPreviousData: true, // This option can help with smooth transitions
    });

    return { userProjects, isLoading };
}

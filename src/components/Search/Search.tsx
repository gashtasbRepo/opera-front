import { Table, Thead, Tbody, Tr, Th, Td, Box, Button, ScaleFade, Fade } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import FilterIcon from '../../assets/icons/filter.svg';
import './style.scss';
import FilterComponent from './FilterComponent';
import CallIcon from '../../assets/icons/call.svg'

interface Call {
  id: number;
  call_id: string;
  duration: number;
  status: string;
}

const Search = () => {
  const navigate = useNavigate();
  const [calls, setCalls] = useState<Call[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchCalls = async () => {
      setLoading(true);
      setError(null);

      // Retrieve the access token from localStorage
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        setError('Access token not found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://185.243.48.218/api_asr/records/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized. Please log in again.');
          } else {
            throw new Error('Failed to fetch calls.');
          }
        }

        const data: Call[] = await response.json();
        setCalls(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error instanceof Error) {
          setError(error.message || 'An unknown error occurred.');
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCalls();
  }, []);

  const handleDetailsClick = (call: Call) => {
    navigate(`/call-details/${call.id}`, { state: { call } }); 
  };
  
  return (
    <Fade initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Box dir="rtl" className="search" p="5">
        {/* Filter Button */}
        <Button className="filterButton" onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <img src={FilterIcon} alt="addIcon" />
          <span>فیلترها</span>
        </Button>

        <div style={{ position: 'relative', height: '100%' }}>
          {/* Filter Component */}
          <ScaleFade in={isFilterOpen} style={{ zIndex: '1000' }}>
            <div style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0' }}>
              <FilterComponent setIsFilterOpen={setIsFilterOpen} />
            </div>
          </ScaleFade>

          {/* Table */}
          <ScaleFade in={!isFilterOpen} style={{ zIndex: '1' }}>
            <Table
              variant="simple"
              className="usersTable"
              size="sm"
              style={isFilterOpen ? { display: 'none' } : {}}
            >
              <Thead className="usersTableHeader">
                <Tr>
                  <Th width="5%">ردیف</Th>
                  <Th width="30%">شناسه تماس</Th>
                  <Th width="15%">مدت تماس (ثانیه)</Th>
                  <Th width="15%">وضعیت</Th>
                  <Th width="15%">فعالیت</Th>
                </Tr>
              </Thead>
              <Tbody>
                {loading ? (
                  <Tr>
                    <Td colSpan={4} textAlign="center">
                      در حال بارگذاری...
                    </Td>
                  </Tr>
                ) : error ? (
                  <Tr>
                    <Td colSpan={4} textAlign="center" color="red">
                      {error}
                    </Td>
                  </Tr>
                ) : (
                  calls.map((call, index) => (
                    <Tr key={call.id}>
                      <Td>{index + 1}</Td>
                      <Td>{call.call_id}</Td>
                      <Td>{call.duration}</Td>
                      <Td>{call.status}</Td>
                      <Td>
                        <Button className='DetailsButton' onClick={() => handleDetailsClick(call)}>
                          <img src={CallIcon} alt='editIcon' />
                          <span>جزئیات تماس</span>
                        </Button>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>

            {/* Pagination */}
            <Box mt="5" className="usersPagePagination" style={isFilterOpen ? { display: 'none' } : {}}>
              <Pagination defaultCurrent={1} total={calls.length} align="center" />
            </Box>
          </ScaleFade>
        </div>
      </Box>
    </Fade>
  );
};

export default Search;

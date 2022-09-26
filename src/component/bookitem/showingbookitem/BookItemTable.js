import { Table, Button, Dropdown } from 'flowbite-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


function BookItemTable({ books }) {
    const header = ["image", "tile", "summary", "author", "Action"];

    useEffect(() => {

    })

    return (
        <div className='p-8'>

            <div className="my-8">
                <Button gradientDuoTone="tealToLime">
                    <Link to="/addingbook">Add Book</Link>
                </Button>
            </div>

            <Table hoverable={true}>
                <Table.Head>
                    {header.map((value, index) => <Table.HeadCell>{value}</Table.HeadCell>)}
                </Table.Head>
                <Table.Body className="divide-y">
                    {books.map((value, index) => {
                        return (
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 ">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    <img className='h-24' src={value.image}></img>
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {value.title}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {value.summary}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {value.author}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    <Dropdown label="More">
                                        <Dropdown.Header>
                                            <span className="block text-sm">
                                                Bonnie Green
                                            </span>
                                            <span className="block text-sm font-medium truncate">
                                                bonnie@flowbite.com
                                            </span>
                                        </Dropdown.Header>
                                        <Dropdown.Item >
                                            <Link to={`/updatingbook/${value.id}`}>Update</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <Link to={`/showingdetail/${value.id}`}>Detail</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <Link to={`/deletingbook/${value.id}`}>Delete</Link>
                                        </Dropdown.Item>
                                    </Dropdown>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    );
}

export default BookItemTable;
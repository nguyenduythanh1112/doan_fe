import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { Table } from 'flowbite-react';
export default function BookDetail({ book }) {
    const header = ["image", "tile", "summary", "author", "Action"];
    return (
        <div className="flex justify-around mt-16">
            <Card className="w-96">
                <CardHeader color="blue" className="relative h-56">
                    <img
                        src={book.image}
                        alt="img-blur-shadow"
                        className="h-full w-full"
                    />
                </CardHeader>
                <CardBody className="text-center">
                    <Typography variant="h5" className="mb-2">
                        {book.title}
                    </Typography>
                    <Typography>
                        {book.description}
                    </Typography>
                </CardBody>
                <CardFooter divider className="flex items-center justify-between py-3">
                    <Typography variant="small">
                        <Button>Edit</Button>
                    </Typography>
                    <Typography variant="small" color="gray" className="flex gap-1">
                        <Button>View file</Button>
                    </Typography>
                </CardFooter>
            </Card>
            <div className="w-1/2">
                <Table hoverable={true}>
                    <Table.Body className="divide-y">
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                numberOfPage
                            </Table.Cell>
                            <Table.Cell>
                                {book.numberOfPage}
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                language
                            </Table.Cell>
                            <Table.Cell>
                                {book.language}
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                importedPrice
                            </Table.Cell>
                            <Table.Cell>
                                {book.importedPrice}
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                importedQuantity
                            </Table.Cell>
                            <Table.Cell>
                                {book.importedQuantity}
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                exportedQuantity
                            </Table.Cell>
                            <Table.Cell>
                                {book.exportedQuantity}
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                publisher
                            </Table.Cell>
                            <Table.Cell>
                                {book.publisher}
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                author
                            </Table.Cell>
                            <Table.Cell>
                                {book.author}
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                category
                            </Table.Cell>
                            <Table.Cell>
                                {book.category}
                            </Table.Cell>
                        </Table.Row>

                    </Table.Body>
                </Table>
            </div>
        </div>
    );
}
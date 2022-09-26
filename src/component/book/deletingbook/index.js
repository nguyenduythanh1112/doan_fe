import { Alert, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ShowingDetail from '../showingdetail';
function DeletingBook() {
    const [book, setBook] = useState(null);
    const { id } = useParams();

    const Book = () => {
        return book;
    }

    console.log(book)

    useEffect(() => {
        if (!book) setBook(<ShowingDetail idBook={id}></ShowingDetail>)
    })


    const handleDeleteBook = () => {

    }

    return (
        <>
            <div className="mx-8">
                <Alert color="info" additionalContent={
                    <div className="flex justify-evenly">
                        <Button gradientDuoTone="greenToBlue" onClick={handleDeleteBook}>
                            Back
                        </Button>
                        <Button gradientDuoTone="greenToBlue">
                            Yes
                        </Button>
                    </div>
                }>
                    <h3 className="text-lg font-medium text-blue-700 dark:text-blue-800">
                        Are you sure
                    </h3>
                </Alert>

            </div>
            {book && <Book></Book>}
        </>

    );
}

export default DeletingBook;
import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Input, Typography } from '@material-tailwind/react';
function Register() {
    return (
        <div className='flex  justify-center mt-10'>
            <Card className="w-96">
                <CardHeader
                    variant="gradient"
                    color="blue"
                    className="mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        Sign up
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input label="Username" size="lg" />
                    <Input label="Password" size="lg" />
                    <Input label="Email" size="lg" />
                </CardBody>
                <CardFooter className="pt-0">
                    <Button variant="gradient" fullWidth >
                        Sign up
                    </Button>
                    <Typography variant="small" className="mt-6 flex justify-center">
                        Don't have an account?
                        <Typography
                            as="a"
                            href="#signup"
                            variant="small"
                            color="blue"
                            className="ml-1 font-bold"
                        >
                            Sign in
                        </Typography>
                    </Typography>
                </CardFooter>
            </Card>
        </div>
    );
}

export default Register;
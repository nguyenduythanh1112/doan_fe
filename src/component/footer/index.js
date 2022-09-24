import {
    Footer as FooterFlowbite,

} from "flowbite-react";


function Footer() {
    return (
        <div>
            <FooterFlowbite container={true}>
                <div className="w-full">
                    <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
                        <div>
                            <FooterFlowbite.Brand
                                href="https://flowbite.com"
                                src="https://flowbite.com/docs/images/logo.svg"
                                alt=""
                                name="Book Store"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                            <div>
                                <FooterFlowbite.Title title="about" />
                                <FooterFlowbite.LinkGroup col={true}>
                                    <FooterFlowbite.Link href="#">
                                        Flowbite
                                    </FooterFlowbite.Link>
                                    <FooterFlowbite.Link href="#">
                                        Tailwind CSS
                                    </FooterFlowbite.Link>
                                </FooterFlowbite.LinkGroup>
                            </div>
                            <div>
                                <FooterFlowbite.Title title="Follow us" />
                                <FooterFlowbite.LinkGroup col={true}>
                                    <FooterFlowbite.Link href="#">
                                        Github
                                    </FooterFlowbite.Link>
                                    <FooterFlowbite.Link href="#">
                                        Discord
                                    </FooterFlowbite.Link>
                                </FooterFlowbite.LinkGroup>
                            </div>
                            <div>
                                <FooterFlowbite.Title title="Legal" />
                                <FooterFlowbite.LinkGroup col={true}>
                                    <FooterFlowbite.Link href="#">
                                        Privacy Policy
                                    </FooterFlowbite.Link>
                                    <FooterFlowbite.Link href="#">
                                        Terms & Conditions
                                    </FooterFlowbite.Link>
                                </FooterFlowbite.LinkGroup>
                            </div>
                        </div>
                    </div>
                    <FooterFlowbite.Divider />
                    <div className="w-full sm:flex sm:items-center sm:justify-between">
                        <FooterFlowbite.Copyright
                            href="#"
                            by="Flowbite™"
                            year={2022}
                        />
                    </div>
                </div>
            </FooterFlowbite>
        </div>

    );
}

export default Footer;
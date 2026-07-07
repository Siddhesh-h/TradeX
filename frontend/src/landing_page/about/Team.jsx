import React from "react";

export default function Team() {
    return (
        <div className="py-20 w-[900px] max-w-full mx-auto">
            <div className="">
                <h1 className="text-center text-2xl font-medium mb-5 text-[#424242]">
                    People
                </h1>
            </div>

            <div className="flex justify-between gap-20 pt-10">
                <div className="text-center w-full">
                    <img
                        src="images\siddheshImage.png"
                        alt="siddhesh"
                        className="w-[90%] rounded-full mx-auto mb-5"
                    />
                    <h4 className="text-lg font-normal">Siddhesh Sarang</h4>
                    <h6 className="text-sm text-[#666] my-4">
                        Full Stack Developer
                    </h6>
                </div>
                <div className="text-base leading-7">
                    <p className="mb-4">
                        I built this website as an independent project to apply
                        and expand my knowledge of web development. From concept
                        and design to deployment and maintenance, I managed the
                        complete development lifecycle.
                    </p>

                    <p className="mb-4">
                        The project reflects my interest in creating
                        user-centric digital solutions, writing clean and
                        efficient code, and continuously improving through
                        hands-on experience.
                    </p>

                    <p className="mb-4">
                        When I'm not coding, I enjoy learning emerging
                        technologies, exploring new ideas, and working on
                        innovative side projects.
                    </p>
                    <p className="mb-4">
                        Connet on{" "}
                        <a
                            href="https://www.linkedin.com/in/siddhesh-sarang-761b30229/"
                            target="_blank"
                            className="text-[#387ed1] font-medium"
                        >
                            Linkedin
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

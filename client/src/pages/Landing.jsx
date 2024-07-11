import Slider from "../components/Slider"

export const OnBoard = () =>{
    const source = "https://cdn.pixabay.com/photo/2023/03/05/11/02/burger-7831128_640.jpg"
    return(
        <div className="relative h-screen bg-cover bg-center font-poppins" style={{backgroundImage: `url(${source})`}}>
            <div className="absolute bottom-0 left-0 right-0 h-[26rem] bg-[#FE8C00] p-5 m-8 md:m-4 rounded-[3rem] bg-opacity-100 text-center">
                {/* <h1 className="font-semibold text-[2rem] text-white mb-2">We serve incomparable delicacies</h1>
                <p className="text-base text-white mt-8 mb-4">All the best restaurants with their top menu waiting for you, they can’t wait for your order!!</p>
                <div className="flex justify-between mt-[9rem] md:mt-[18rem]">
                    <button className="text-white font-semibold">Skip</button>
                    <button className="text-white font-semibold">Next <span className="ml-1">→</span></button>
                </div> */}
                <Slider/>
            </div> 


        </div>
    )
}
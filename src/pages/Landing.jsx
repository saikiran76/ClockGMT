import Slider from "../components/Slider"

export const OnBoard = () =>{
    const source = "https://cdn.pixabay.com/photo/2023/03/05/11/02/burger-7831128_640.jpg"
    return(
        <div className="relative h-screen bg-cover bg-center font-poppins" style={{backgroundImage: `url(${source})`}}>
            <div className="absolute bottom-0 left-0 right-0 h-[26rem] bg-[#FE8C00] p-5 m-8 md:m-4 rounded-[3rem] bg-opacity-100 text-center">
                <Slider/>
            </div> 
        </div>
    )
}
import { CommonLeyout } from "./../Leyout";




export default function Live() {
  return (
    <CommonLeyout pagesName="Live" >

      <div className="lg:col-span-2 space-y-8">
        <iframe
          className="w-[100%] h-[60vh] rounded-xl "
          src="https://www.youtube.com/embed/fQcqUs3ARWU"
          title="NEWS24 সরাসরি সম্প্রচার | লাইভ নিউজ আপডেট | 24/7 নিউজ স্ট্রিমিং | News24 Live TV | News24 Live"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>

        <div className="grid grid-cols-3 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-8">

            <div className="story-card p-4 cursor-pointer mobile-card-padding ">
              <div className="bg-gradient-to-br from-red-600 to-blue-600 mb-2 rounded-xl">
                <video src="https://www.youtube.com/embed/fQcqUs3ARWU"></video>
              </div>
              <h2 >NEWS24 সরাসরি সম্প্রচার | লাইভ নিউজ আপডেট | 24/7 নিউজ স্ট্রিমিং | News24 Live TV | News24 Live</h2>
            </div>
          
          </div>
        </div>

      </div>


      <div className="space-y-6">

      </div>





    </CommonLeyout>
  );
}

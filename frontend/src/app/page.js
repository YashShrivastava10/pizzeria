import Image from "next/image"

const Home = () => {
  const imageDesc = [
    {
      "image": "https://image.shutterstock.com/z/stock-photo-raw-dough-for-pizza-with-ingredients-and-spices-on-table-526830277.jpg",
      "height": 300,
      "width": 450,
      "heading": "Ingredients",
      "desc": "We're ruthless about goodness. We have no qualms about tearing up a day-old lettuce leaf (straight from the farm), or steaming a baby (carrot). Cut. Cut. Chop. Chop. Steam. Steam. Stir Stir. While they're still young and fresh - that's our motto. It makes the kitchen a better place."
    },
    {
      "image": "https://thumb1.shutterstock.com/display_pic_with_logo/2982127/437116033/stock-photo-happy-chef-437116033.jpg",
      "height": 300,
      "width": 450,
      "heading": "Our Chef",
      "desc": "They make sauces sing and salads dance. They create magic with skill, knowledge, passion, and stirring spoons (among other things). They make goodness so good, it doesn't know what to do with itself. We do though. We send it to you."
    },
    {
      "image": "https://thumb9.shutterstock.com/display_pic_with_logo/175989610/669255388/stock-photo-vintage-analog-kitchen-countdown-timer-with-classical-clock-face-and-red-remaining-time-display-669255388.jpg",
      "height": 300,
      "width": 550,
      "heading": "45 min delivery",
      "desc": ""
    },
  ]

  return (
    <div className="flex flex-col gap-3 p-5">
      <div className="text-center font-bold text-3xl">Our Story</div>
      <p>We believe in good. We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan page. Fans were given situations where they had to come up with wacky and fun excuses. The person with the best excuse won the Best Excuse Badge and won Pizzeria's vouchers. Their enthusiastic response proved that Pizzeria's Fresh Pan Pizza is the Tastiest Pan Pizza. Ever!</p>
      <p>Ever since we launched the Tastiest Pan Pizza, ever, people have not been able to resist the softest, cheesiest, crunchiest, butteriest Domino's Fresh Pan Pizza. They have been leaving the stage in the middle of a performance and even finding excuses to be disqualified in a football match.</p>
      <p>We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan page. Fans were given situations where they had to come up with wacky and fun excuses. The person with the best excuse won the Best Excuse Badge and won Domino's vouchers. Their enthusiastic response proved that Pizzeria's Fresh Pan Pizza is the Tastiest Pan Pizza. Ever!</p>
      {imageDesc.map((data, index) =>
        <div className={`w-full md:flex-row md:p-0 md:border-none p-2 border-4 border-amber-600 flex-col flex ${index === 1 && "md:flex-row-reverse"}`} key={index}>
          <div className="md:w-1/2 w-full">
            <Image src={data.image} alt={data.heading} height={data.height} width={data.width}/>
          </div>
          <div className={`md:w-1/2 w-full md:ml-2 md:gap-0 gap-2 flex flex-col ${index === 2 ? "justify-center" : "justify-evenly"}`}>
            <span className="font-bold text-3xl">{data.heading}</span>
            <p>{data.desc}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
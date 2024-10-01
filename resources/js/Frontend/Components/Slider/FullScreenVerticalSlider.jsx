import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination, Navigation } from 'swiper/modules';
import { Icon } from '@iconify/react';
import 'swiper/css/pagination';
import NavigationLink from "@/Components/NavigationLink";
import Div from "@/Frontend/Components/Div";

export default function FullScreenVerticalSlider({ data }) {
  return (
    <>
      <Div className="cs-vertical_slider cs-swiper_arrow_style_1">
        <Div className="swiper-button image-swiper-button-next">
          Next <Icon icon="bi:arrow-right" />
        </Div>
        <Div className="swiper-button image-swiper-button-prev">
          <Icon icon="bi:arrow-left" /> Prev
        </Div>
        <Swiper
          direction={'vertical'}
          slidesPerView={1}
          spaceBetween={0}
          mousewheel={true}
          pagination={{
            clickable: true,
          }}
          speed={1000}
          loop={true}
          modules={[Mousewheel, Pagination, Navigation]}
          className="mySwiper"
          navigation={{
            nextEl: '.image-swiper-button-next',
            prevEl: '.image-swiper-button-prev',
            disabledClass: 'swiper-button-disabled',
          }}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <Div
                className="cs-hero cs-style5 cs-bg"
                style={{ backgroundImage: `url(${item.imageUrl})` }}
              >
                <Div className="cs-hero_text">
                  <h1 className="cs-hero_title" dangerouslySetInnerHTML={{__html: item.title}}></h1>
                  <NavigationLink href={item.href} className="cs-btn cs-style1 cs-type1">
                    <span>{item.action_text}</span>
                  </NavigationLink>
                </Div>
              </Div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Div>
    </>
  );
}

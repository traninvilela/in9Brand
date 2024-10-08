import Div from "@/Frontend/Components/Div";
import React from "react";

export default function FunFact6({funFact_data}){
    return(
        <section
            className="cs-bg"
            style={{ backgroundImage: `url(${funFact_data?.background_image})` }}
        >
            <div className="container">
                <Div className="cs-funfact_wrap cs-type2">
                    <Div className="cs-funfact_shape"  style={{backgroundImage: 'url(/static/funfact_shape_bg.svg)'}} />
                    <Div className="cs-funfact_left">
                        <Div className="cs-funfact_heading">
                            <h2>{funFact_data.title}</h2>
                            <p>{funFact_data.sub_title}</p>
                        </Div>
                    </Div>
                    <Div className="cs-funfact_right">
                        <Div className="cs-funfacts">
                            {funFact_data.fun_facts.map((item, index) => (
                                <Div className="cs-funfact cs-style1" key={index}>
                                    <Div className="cs-funfact_number cs-primary_font cs-semi_bold cs-primary_color"><span/>{item.value}</Div>
                                    <Div className="cs-funfact_text">
                                        <span className="cs-accent_color">+</span>
                                        <p>{item.title}</p>
                                    </Div>
                                </Div>
                            ))}
                        </Div>
                    </Div>
                </Div>
            </div>
        </section>
    )
}

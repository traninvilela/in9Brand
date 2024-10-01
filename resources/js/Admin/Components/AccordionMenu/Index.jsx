import "./accordionMenu.scss"
import {useState} from "react";
import PagesAccordion from "@/Admin/Components/AccordionMenu/PagesAccordion";
import PostAccordion from "@/Admin/Components/AccordionMenu/PostAccordion";
import CategoryAccordion from "@/Admin/Components/AccordionMenu/CategoryAccordion";
import CustomLinkAccordion from "@/Admin/Components/AccordionMenu/CustomLinkAccordion";
import ServiceAccordion from "@/Admin/Components/AccordionMenu/ServiceAccordion";
import PortfolioAccordion from "@/Admin/Components/AccordionMenu/PortfolioAccordion";
import CaseStudyAccordion from "@/Admin/Components/AccordionMenu/CaseStudyAccordion";

export default function Index({ addMenu }){
    const [expandAccordion, setExpandAccordion] = useState('');
    return(
        <div className="accordion-menu">
            <h2>Add menu items</h2>
            <ul className="list-group">
                <PagesAccordion addMenu={addMenu} />
                <ServiceAccordion addMenu={addMenu} />
                <PortfolioAccordion addMenu={addMenu} />
                <CaseStudyAccordion addMenu={addMenu} />
                <PostAccordion addMenu={addMenu} />
                <CategoryAccordion addMenu={addMenu} />
                <CustomLinkAccordion addMenu={addMenu} />
            </ul>

        </div>
    )
}

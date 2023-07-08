import React from 'react'

const TwoWaySlab = (props) => {
    var flag=0;
    const choose_positive_min=(value1,value2)=>
    {
      if (value1 >= 0 && value2 >= 0)
      {
        return Math.min(value1, value2);
      }
    
      else if (value1 >= 0)
      {
        return value1;
      }

      else if (value2 >= 0)
      {
        return value2;
      }

      return -1;
    };

    const find_lowest_nearest_multiple_of_10=(num)=>
    {
      
      var nearest_multiple;
      nearest_multiple = Math.floor(num/10);
      nearest_multiple=nearest_multiple*10;
      
      return nearest_multiple;
    };

    const Long_Span=props.breadth;
    const Short_Span=props.length;
    const Live_Load=3.5;
    const Dead_Load=0.25;
    const Concrete_grade = 20,Steel_Strength=415;

    const Depth=Short_Span;
    const Effective_depth = Math.round(Depth*1000);
    const Total_depth = Effective_depth + 20+4;


    const Self_weight = 25*(1)*(Total_depth/1000)  ;
    const Floor_Finish=1;

    const Total_Load = Live_Load + Dead_Load + Self_weight + Floor_Finish;
    const Factored_Load = 1.5*Total_Load;

    const ratio = Math.float(Long_Span) / Math.float(Short_Span);
    const final_ratio = Math.round(ratio, 2);



    var short_negative_momentcoefficient;
    var short_positive_momentcoefficient;
    var long_negative_momentcoefficient;
    var long_positive_momentcoefficient;


    var Negative_shortspan_Moment = short_negative_momentcoefficient*Factored_Load*(Math.pow(Short_Span,2)) ;   

    var Positive_shortspan_Moment = short_positive_momentcoefficient*Factored_Load*(Math.pow(Short_Span,2));
 
    var Negative_longspan_Moment = long_negative_momentcoefficient*Factored_Load*(Math.pow(Short_Span,2));

    var Positive_longspan_Moment = long_positive_momentcoefficient*Factored_Load*(Math.pow(Short_Span,2));

    var Effective_depth_req = (Math.sqrt((Negative_shortspan_Moment*1000000)/(0.138*Concrete_grade*1000)));





    var Ast_min,Maximum_spacing,a,b,c,root1,root2,discriminant,Area_required,dia,area_of_bar,no_of_bar,number,spacing,Spacing,Area_requiredx1,Area_providedx,Area_requiredx2;

    if(Effective_depth_req>Effective_depth)
    {
        Ast_min = (0.0012)*(1000*Total_depth);
        Maximum_spacing = Math.min(3*Effective_depth,300);

        a = (Math.pow((Steel_Strength),2)*0.87)/(Concrete_grade*1000)
        b = -(Steel_Strength*0.87*Effective_depth)
        c = Negative_shortspan_Moment*1000000;

        discriminant = (Math.pow(b,2)) - (4*a*c);

        if (discriminant<0)
        {
          root1=-b/(2*a);
          root2=-b/(2*a);
        }

        else
        {
          root1 = (-b + Math.sqrt(discriminant)) / (2*a);
          root2 = (-b - Math.sqrt(discriminant)) / (2*a);
        }

        Area_requiredx1=choose_positive_min(root1,root2);

        if(Area_requiredx1>=0)
        {
            
            dia = 10;                                                         
            area_of_bar = (3.14*(Math.pow(dia,2)))/4;
            no_of_bar = Area_requiredx1/area_of_bar + 1;
            number = Math.round(no_of_bar);
            spacing = 1000/number;
            Spacing = find_lowest_nearest_multiple_of_10(spacing);

            if (Maximum_spacing>=Spacing)
            {
                Area_providedx = (no_of_bar - 1)*(Math.floor( spacing/ 100) * 100);

                a = (Math.pow((Steel_Strength),2)*0.87)/(Concrete_grade*1000);
                b = -(Steel_Strength*0.87*Effective_depth);
                c = Positive_shortspan_Moment*1000000;

                discriminant = (Math.pow(b,2)) - (4*a*c);

                if (discriminant<0)
                {
                    root1=-b/(2*a);
                    root2=-b/(2*a);
                }

                else
                {
                    root1 = (-b + Math.sqrt(discriminant)) / (2*a);
                    root2 = (-b - Math.sqrt(discriminant)) / (2*a);
                }

                Area_requiredx2=choose_positive_min(root1,root2);

                if (Area_requiredx2>=0)
                {
                    dia=10;
                    area_of_bar = (3.14*(Math.pow(dia,2)))/4;
                    no_of_bar = Area_requiredx2/area_of_bar + 1;
                    number = Math.round(no_of_bar);
                    spacing = 1000/number;
                    Spacing = find_lowest_nearest_multiple_of_10(spacing);

                    if(Maximum_spacing>=Spacing)
                    {

                    }
                    else
                    {
                        alert("Maximum Spacing < Spacing for Area_reqx2");
                    }
                }
                else
                {
                    alert("Required Areax2 is negative");

                }

            }
            else
            {
                alert("Maximum Spacing < Spacing for Area_reqx1")
            }


        }
        else
        {
          alert("Required Areax1 is negative");
        }
    }

    else
    {
        alert("The effective depth selected is not sufficient to resist the design ultimate moment")
    }












  return (
    <div>
      
    </div>
  )
}

export default TwoWaySlab

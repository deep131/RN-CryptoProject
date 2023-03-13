import React from 'react';
import {Dimensions, View,Text} from 'react-native';
import {ChartDot, ChartPath, ChartPathProvider, ChartXLabel,ChartYLabel ,monotoneCubicInterpolation} from '@rainbow-me/animated-charts';
import { SIZES,COLORS } from '../Constatnts/theme';
import moment from 'moment/moment';
const Chart=({containerStyle,chartPrices})=>{
        let startUnixTimeStamp=moment().subtract(7,'day').unix();
        let data=chartPrices?chartPrices?.map((item,index)=>{
            return{
                x:startUnixTimeStamp+(index+1)*3600,
                y:item
            }
        }):[]

        const  points=monotoneCubicInterpolation({data,range:40})

return(
    <View style={{...containerStyle}} >
{
    data.length>0 &&
    <ChartPathProvider
    data={{ 
        points,
        smoothingStrategy:'bezier'
    }} > 
    <ChartPath 
          height={150} 
          width={SIZES.width}
        
          strokeWidth={2}
          />   
        
    <ChartDot>
    <View style={{position:'absolute',left:-35,width:80,alignItems:'center',backgroundColor:COLORS.black}}>
     <View style={{alignItems:'center',justifyContent:'center',width:25,height:25,borderRadius:15,backgroundColor:COLORS.white}}>
    <View
    style={{
        width:15,height:15,borderRadius:10,backgroundColor:COLORS.lightgreen
    }}
    />
     </View>
    </View>
</ChartDot>

</ChartPathProvider>
}   
 </View>
)
}
export default Chart;
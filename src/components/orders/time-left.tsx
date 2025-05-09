import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { Text } from '../ui/text';

interface TimeLeftProps {
   hours: string;
}

export const TimeLeft: React.FC<TimeLeftProps> = ({ hours }) => {
   return (
      <View className="flex-row items-center bg-white border border-gray-100 rounded-lg px-3 py-2 shadow-sm">
         <Feather name="clock" size={16} color="#f87171" />
         <Text className="text-gray-700 text-xs ml-1.5">TIME LEFT</Text>
         <Text className="text-gray-700 text-xs font-medium ml-1">
            {hours} Hrs
         </Text>
      </View>
   );
};

import { ReactNode, createContext, useContext } from "react";
import { SharedValue, useSharedValue } from "react-native-reanimated";

interface forecastSheetProviderProps {
    children: ReactNode
}

export const ForecastSheetContext = createContext<SharedValue<number>|null>(
    null
)

export const ForecastSheetProvider = ({children}: forecastSheetProviderProps) => {
    const animationPosition = useSharedValue(0)
    return (
    <ForecastSheetContext.Provider value={animationPosition}>
        {children}
    </ForecastSheetContext.Provider>
    )
}

const useForecastSheetProvider = ()<SharedValue<number>> => {
    const context = useContext(ForecastSheetContext)
    if (context === null) => {
        throw new Error("useForecastSheetPosition must be within the ForecastSheet Provider")
    }

    return context
}
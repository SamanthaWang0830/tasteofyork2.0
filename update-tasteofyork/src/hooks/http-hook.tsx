import { useState,useCallback, useRef , useEffect} from "react"

interface HttpClientResponse {
    isLoading: boolean;
    loadingError: string | null;
    sendRequest: (
      url: string,
      method?: string,
      body?: any,
      headers?: HeadersInit
    ) => Promise<any>;
}

const useHttpClient=(): HttpClientResponse=>{
    const [isLoading, setIsLoading]=useState<boolean>(false)
    const [loadingError, setLoadingError]=useState<string | null>(null)

    const activeHttpRequests= useRef<AbortController[]>([])

    const sendRequest=useCallback(
        async(
            url: string, 
            method: string='GET', 
            body: any=null, 
            headers={}
        )=>{
            setIsLoading(true)
            const httpAbortController= new AbortController()
            activeHttpRequests.current.push(httpAbortController)

            try {
                const response=await fetch(url,{
                    method,
                    body,
                    headers,
                    signal:httpAbortController.signal
                })
                const responseData= await response.json()
                if(!response.ok){
                    throw new Error(responseData.message)
                }
                setIsLoading(false)
                return responseData
        } catch (err:any) {
            setLoadingError(err.message || 'Something went wrong, please try it again')
            setIsLoading(false)
            throw err
        }
    },[])

    // Cleanup function to abort active requests when the component unmounts
    useEffect(()=>{
        return ()=>{
            activeHttpRequests.current.forEach(abortController=>abortController.abort())
        }
    },[])
    return {isLoading,loadingError,sendRequest}
}
export default useHttpClient
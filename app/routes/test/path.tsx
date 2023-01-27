import type {
    ActionFunction,
    ErrorBoundaryComponent,
    LoaderFunction,
} from "@remix-run/node"
import {
    json,
    redirect
} from "@remix-run/node"
import {useCatch, useParams} from "@remix-run/react"
import {FC} from "react"

type LoaderData = {}

const loader: LoaderFunction = async ({request, params}) => {
    const data: LoaderData = {}
    return json<LoaderData>(data)
}

const action: ActionFunction = async ({request, params}) => {
    return redirect("/")
}

const TestPathRoute: FC = () => {
    return <h2>TestPathRoute</h2>
}

const CatchBoundary = () => {
    const caught = useCatch()
    const params = useParams()

    return <p>Something went wrong.</p>
}

const ErrorBoundary: ErrorBoundaryComponent = ({error}) => {
    console.log(error)

    const params = useParams()
    return <p>Something went wrong.</p>
}

export default TestPathRoute
export {
    action,
    CatchBoundary,
    ErrorBoundary,
    loader,
}
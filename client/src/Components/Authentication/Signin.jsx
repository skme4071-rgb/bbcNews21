

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Form from "./Form";
import useFetch from "../../hooks/useFetch";
import { CustomError, Input, CustomLink, CustomNotification } from "./../utlis/tag";
import { signinSchema } from "./validation";
import { ContextFocusBox } from "../../context/FocusBoxContext";
import { useAuth } from "../../context/AuthContext";

export default function Signin() {
    const { closeFocusBox } = ContextFocusBox();
    const { login, user } = useAuth();
    const [resError, setResError] = useState({});
    const [oneError, setOneError] = useState({ errorName: null, errorMgs: null });

    const {
        register: formSignin,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(signinSchema),
    });

    const { data, error, loading, refetch } = useFetch(
        `https://bbcnews21.onrender.com/Auth/user/login`,
        { auto: false }
    );

    // ✅ Close focus box if user is already logged in
    useEffect(() => {
        if (user.loggedIn) closeFocusBox();
    }, [user.loggedIn, closeFocusBox]);

    // 🔹 Submit handler
    const onSubmit = (formData) => {
        const payload = {
            email: formData.email,
            password: formData.password,
        };
        setResError({});
        refetch({ method: "POST", body: payload });
    };

    // 🔹 Update errors & login
    useEffect(() => {
        if (data?.success) {
            login(data.user);
            closeFocusBox();
        } else if (data?.errors) {
            setResError(data.errors);
        }
    }, [data, login, closeFocusBox]);

    // 🔹 Map first available error to oneError (frontend + backend)
    useEffect(() => {
        const fields = ["email", "password"];
        for (const field of fields) {
            const msg = resError?.[field]?.msg || errors?.[field]?.message;
            if (msg) {
                setOneError({ errorName: field, errorMgs: msg });
                return; // stop at first error
            }
        }
        setOneError({ errorName: null, errorMgs: null }); // reset if no error
    }, [resError, errors]);

    return (
        <Form onSubmit={handleSubmit(onSubmit)} formName="Signin">
            {error && <CustomNotification message={error.message} />}

            {/* Email */}
            <div className="min-[441px]:w-[300px]">
                <Input
                    {...formSignin("email")}
                    type="email"
                    placeholder="Email"
                    autoComplete="username"
                />
                {oneError.errorName === "email" && <CustomError>{oneError.errorMgs}</CustomError>}
            </div>

            {/* Password */}
            <Input
                {...formSignin("password")}
                type="password"
                placeholder="Password"
                autoComplete="current-password"
            />
            {oneError.errorName === "password" && <CustomError>{oneError.errorMgs}</CustomError>}

            {/* Forgot password link */}
            <CustomLink
                to="/forgot-password"
                className="text-sm text-blue-500 mb-4 inline-block"
            >
                Forgot your password?
            </CustomLink>

            {/* Submit Button */}
            <button
                disabled={loading || isSubmitting}
                className="bg-blue-600 text-white py-2 rounded w-full mt-4 hover:bg-blue-700"
            >
                {loading ? "Processing..." : "SIGN IN"}
            </button>
        </Form>
    );
}

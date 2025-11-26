import { NextRequest, NextResponse } from "next/server";
import fs from 'fs/promises'
import path from "path";
import todojson from "@/data/todo.json";

import { v4 as uuidv4 } from "uuid";

const getFilePath = () => path.join(process.cwd(), 'src', "data", "todo.json");

type Todo = {
    "id": string,
    "text": string,
    "completed": boolean
}


async function getData(): Promise<Todo[]> {
    const jsonData = await fs.readFile(getFilePath(), 'utf-8');
    return JSON.parse(jsonData);
}
async function writeData(data: Todo[]) {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(getFilePath(), jsonData, 'utf-8');
}


export async function GET(request: NextRequest) {
    const data = await getData();
    const searchParams = new URL(request.url).searchParams;
    const id = searchParams.get("id");
    const title = searchParams.get("title");
    
    console.log(id);
    console.log(title);
    if (id) {
        const idData = data.find((item) => item.id === id);
        if (idData) {
            return NextResponse.json(idData);
        } else {
            return NextResponse.json({ message: `${id}번을 찾을 수 없습니다.` }, { status: 404 });
        }
    }
    else if (title) {
        const titleData =data.find((item) => item.text === String(title));
        if (titleData) {
            return NextResponse.json(titleData);
        } else {
            return NextResponse.json({ message: `${title}을(를) 찾을 수 없습니다.` }, { status: 404 });
        }
    }
    else {
        return NextResponse.json(todojson);
    }
}

export async function POST(request: NextRequest) {
    try {
        const reqData = await request.json();
        // 기존 자료 읽기
        const newData: Todo = {...reqData, id: uuidv4()};
        let existingData: Todo[] = [];
        try {
            existingData = await getData();
        } catch (readError) {
            console.log("파일이 없거나 읽을 수 없습니다. 새로 생성합니다.");
            existingData = [];
        }
        // 새로운 자료 추가
        existingData.push(newData);
        // 파일 쓰기 (JSON 포맷팅 포함)
        writeData(existingData)
        return NextResponse.json({ message: "데이터 추가 성공", data: newData }, { status: 201 });
    } catch (error) {
        console.error("POST 요청 오류:", error);
        return NextResponse.json({ error: "데이터 추가 에러 발생" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const searchParams = new URL(request.url).searchParams;
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.json({ error: "ID 파라미터가 필요합니다." }, { status: 400 });
        }
        
        const data = await getData();
        const updatedData = await request.json();
        const index = data.findIndex((item) => item.id === id);

        if (index === -1) {
            return NextResponse.json({ error: "해당 데이터가 없음" }, { status: 404 });
        }
        data[index] = { id: id, ...updatedData };
        await writeData(data);
        return NextResponse.json({ message: "데이터수정완료", data: data[index] });
    } catch (error) {
        console.error("PUT 요청 오류:", error);
        return NextResponse.json({ error: "데이터수정오류" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const searchParams = new URL(request.url).searchParams;
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.json({ error: "ID 파라미터가 필요합니다." }, { status: 400 });
        }
    
        const data = await getData();
        const updatedData = await request.json();
        const index = data.findIndex((item) => item.id === id);
        if (index === -1) {
            return NextResponse.json({ error: "해당 데이터가 없음" }, { status: 404 });
        }
        // 데이터 수정 (기존 데이터 + 수정된 데이터 병합)
        data[index] = { ...data[index], ...updatedData };
        await writeData(data);
        return NextResponse.json({ message: "데이터수정완료", data: data[index] });
    } catch (error) {
        console.error("PATCH 요청 오류:", error);
        return NextResponse.json({ error: "데이터수정오류" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const searchParams = new URL(request.url).searchParams;
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.json({ error: "ID 파라미터가 필요합니다." }, { status: 400 });
        }
     
        const data = await getData();
        const index = data.findIndex((item) => item.id === id);
        if (index === -1) {
            return NextResponse.json({ error: "삭제할 데이터를 찾을 수 없습니다." }, { status: 404 });
        }
        // splice(인덱스, 개수): 해당 인덱스부터 1개를 잘라냄
        data.splice(index, 1);
        await writeData(data);
        return NextResponse.json({
            message: "데이터 삭제 완료",
            deletedId: id
        });
    } catch (error) {
        console.error("DELETE 요청 오류:", error);
        return NextResponse.json({ error: "데이터 삭제 중 서버 오류 발생" }, { status: 500 });
    }
}
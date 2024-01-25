export interface StudentData {
  id: number;
  name: string;
  intake: string;
  year: string;
  semester: string;
  cmsStudentId: string;
  status: string;
  category: string;
  program: string;
  programCode: string;
  modules: ModuleInfo[];
}

interface ModuleInfo {
  id: string;
  name: string;
  moduleType: string;
  moduleStatus: string;
  moduleTypeName: string;
}

function snakeToCamel(obj: any): any {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => snakeToCamel(item));
  }

  return Object.keys(obj).reduce((acc, key) => {
    const camelKey = key.replace(/(_\w)/g, (match) => match[1].toUpperCase());
    acc[camelKey] = snakeToCamel(obj[key]);
    return acc;
  }, {} as any);
}

export const fetchStudentData = async (
  studentId: string,
): Promise<StudentData | null> => {
  const res = await fetch("https://tess.taylors.edu.my/api/getStudentDetails", {
    method: "POST",
    body: JSON.stringify({ cms_student_id: studentId }),
    headers: {
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_AUTH_KEY}`,
      "content-type": "application/json",
    },
  });

  const data = await res.json();

  if (data.length === 0) {
    return null;
  } else {
    for (const studentData of data) {
      studentData.modules = JSON.parse(studentData.modules);
      studentData.modules = studentData.modules.reduce(
        (acc: ModuleInfo[], current: ModuleInfo) => {
          const x = acc.find((item) => item.id === current.id);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        },
        [],
      );
    }

    return snakeToCamel(data[0]);
  }
};
